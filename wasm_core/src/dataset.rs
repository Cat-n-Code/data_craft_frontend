use std::io::Cursor;

use js_sys::{Array, Map};
use polars::{
    frame::DataFrame,
    io::SerReader,
    prelude::{CsvParseOptions, CsvReadOptions, DataType, NamedFrom},
    series::Series,
};
use polars_lazy::prelude::*;
use wasm_bindgen::prelude::*;

use crate::{
    field::{FieldAggregator, FieldFilter, FieldInfo, FieldType},
    utils::any_value_to_js_value,
};

#[wasm_bindgen]
pub struct Dataset {
    fields: Vec<FieldInfo>,
    df: DataFrame,
}

#[wasm_bindgen]
impl Dataset {
    pub fn load_from_csv(blob: &[u8]) -> Result<Self, JsValue> {
        let cursor = Cursor::new(blob);

        let df = CsvReadOptions::default()
            .with_parse_options(CsvParseOptions {
                separator: b';',
                truncate_ragged_lines: true,
                try_parse_dates: true,
                ..Default::default()
            })
            .into_reader_with_file_handle(cursor)
            .finish()
            .map_err(|err| JsValue::from_str(&err.to_string()))?;

        let mut fields = Vec::new();
        for col in df.get_columns() {
            let field_type = match col.dtype() {
                DataType::UInt8
                | DataType::UInt16
                | DataType::UInt32
                | DataType::UInt64
                | DataType::Int8
                | DataType::Int16
                | DataType::Int32
                | DataType::Int64 => FieldType::Integer,
                DataType::Float32 | DataType::Float64 => FieldType::Float,
                DataType::String => FieldType::Text,
                DataType::Date => FieldType::Date,
                DataType::Time => FieldType::Time,
                DataType::Datetime(_, _) => FieldType::DateTime,
                _ => {
                    return Err("Unsupported data type".into());
                }
            };

            fields.push(FieldInfo::new(
                col.name().clone().into_string(),
                field_type,
                !col.has_nulls(),
            ));
        }

        Ok(Self { fields, df })
    }

    // region: Fields
    pub fn fields(&self) -> Vec<FieldInfo> {
        self.fields.clone()
    }

    pub fn add_field(&mut self, info: FieldInfo) {
        // let dt: DateType = info.date_type().into();

        // let series: Series;
        // if info.is_required() {
        //     series = Series::new_empty(info.name().into(), &info.date_type().into());
        // } else {
        //     series = Series::new_null(info.name().into(), &info.date_type().into());
        // }

        // self.df.with_column(lit())

        todo!()
    }

    pub fn update_field(&mut self, index: usize, info: FieldInfo) {
        todo!()
    }

    pub fn swap_fields(&mut self, old_index: usize, new_index: usize) {
        todo!()
    }

    pub fn remove_field(&mut self, index: usize) {
        let _ = self
            .df
            .drop_in_place(&self.df.get_columns()[index].name().clone())
            .unwrap();
    }
    // endregion: Fields

    // region: Rows
    pub fn rows_count(&self) -> usize {
        self.df.height()
    }

    pub fn export_rows(&self, rows: Array) -> Array {
        let arr = Array::new();

        for val in rows {
            let i = val.as_f64().unwrap() as usize;
            let s = &self.df[i];
            let row = Array::new();
            for x in s.iter() {
                row.push(&any_value_to_js_value(x));
            }
            arr.push(&row);
        }

        arr
    }

    pub fn slice(&self, start: usize, end: usize) -> Array {
        let rows = Array::new();
        for _ in start..end {
            rows.push(&Array::new());
        }

        for col in self.df.get_columns() {
            let slice = col.slice(start as i64, end - start);
            for (i, v) in slice.iter().enumerate() {
                let val = any_value_to_js_value(v);
                let arr_value = rows.get(i as u32);
                let arr: &Array = arr_value.unchecked_ref();
                arr.push(&val);
            }
        }

        rows
    }

    pub fn aggregate_rows(&self, indexes: Array, aggregator: FieldAggregator) -> JsValue {
        let cols = self.df.get_columns();
        match aggregator {
            FieldAggregator::Count => {
                let mut count = 0;
                for i in indexes {
                    let i = i.as_f64().unwrap() as usize;
                    let nulls = cols[i].null_count();
                    count += cols[i].len() - nulls;
                }
                count.into()
            }
            FieldAggregator::Min => {
                // TODO: case for datetime
                let mut min = None;
                for i in indexes {
                    let i = i.as_f64().unwrap() as usize;
                    if let Some(val) = cols[i].min::<f64>().unwrap_or(None) {
                        match min {
                            Some(min_val) => min = Some(val.min(min_val)),
                            None => min = Some(val),
                        }
                    }
                }

                min.into()
            }
            FieldAggregator::Max => {
                // TODO: case for datetime
                let mut max = None;
                for i in indexes {
                    let i = i.as_f64().unwrap() as usize;
                    if let Some(val) = cols[i].max::<f64>().unwrap_or(None) {
                        match max {
                            Some(max_val) => max = Some(val.max(max_val)),
                            None => max = Some(val),
                        }
                    }
                }

                max.into()
            }
            FieldAggregator::Sum => {
                let mut sum = None;
                for i in indexes {
                    let i = i.as_f64().unwrap() as usize;
                    if let Ok(val) = cols[i].sum::<f64>() {
                        match sum {
                            Some(sum_val) => sum = Some(sum_val + val),
                            None => sum = Some(val),
                        }
                    }
                }

                sum.into()
            }
            FieldAggregator::Mean => {
                let mut sum = None;
                let mut count = 0;
                for i in indexes {
                    let i = i.as_f64().unwrap() as usize;
                    if let Ok(val) = cols[i].sum::<f64>() {
                        count += cols[i].len() - cols[i].null_count();
                        match sum {
                            Some(sum_val) => sum = Some(sum_val + val),
                            None => sum = Some(val),
                        }
                    }
                }

                sum.map(|val| val / count as f64).into()
            }
        }
    }

    pub fn group_rows(
        &self,
        group_field_index: usize,
        aggregate_field_index: usize,
        aggregator: FieldAggregator,
    ) -> Array {
        let group_column = self.df.get_columns()[group_field_index].name();
        let agg_column = self.df.get_columns()[aggregate_field_index].name();

        let lazy_df = self.df.clone().lazy();

        let aggregated_df = match aggregator {
            FieldAggregator::Count => lazy_df
                .group_by([col(group_column.clone())])
                .agg([col(agg_column.clone()).count()]),
            FieldAggregator::Min => lazy_df
                .group_by([col(group_column.clone())])
                .agg([col(agg_column.clone()).min()]),
            FieldAggregator::Max => lazy_df
                .group_by([col(group_column.clone())])
                .agg([col(agg_column.clone()).max()]),
            FieldAggregator::Sum => lazy_df
                .group_by([col(group_column.clone())])
                .agg([col(agg_column.clone()).sum()]),
            FieldAggregator::Mean => lazy_df
                .group_by([col(group_column.clone())])
                .agg([col(agg_column.clone()).mean()]),
        }
        .collect()
        .unwrap();

        let grouped_values_js = Array::new();
        let aggregated_values_js = Array::new();

        let grouped_values = aggregated_df.column(group_column).unwrap();
        let aggregated_values = aggregated_df.column(agg_column).unwrap();

        for opt_val in grouped_values.iter() {
            grouped_values_js.push(&any_value_to_js_value(opt_val));
        }

        for opt_val in aggregated_values.iter() {
            aggregated_values_js.push(&any_value_to_js_value(opt_val));
        }

        let result = Array::new();
        result.push(&grouped_values_js);
        result.push(&aggregated_values_js);

        result
    }

    pub fn distinct_values(&self, field_index: usize, max_count: usize) -> Option<Array> {
        if let Ok(values) = self.df.get_columns()[field_index].unique() {
            let arr = Array::new();
            for v in values.rechunk().iter().take(max_count) {
                arr.push(&any_value_to_js_value(v));
            }
            Some(arr)
        } else {
            None
        }
    }

    pub fn filter_values(&self, filters: Vec<FieldFilter>) -> Dataset {
        assert!(filters.len() == self.df.width());

        let mut lazy_df = self.df.clone().lazy();

        for (column, filter) in self.df.get_columns().iter().zip(&filters) {
            let col_expr = column.name().as_str();

            if let Some(min_val) = filter.min_value {
                lazy_df = lazy_df.filter(col(col_expr).gt_eq(lit(min_val)));
            }
            if let Some(max_val) = filter.max_value {
                lazy_df = lazy_df.filter(col(col_expr).lt_eq(lit(max_val)));
            }

            if !filter.values.is_empty() {
                let values_expr = lit(Series::new("".into(), &filter.values));
                lazy_df = lazy_df.filter(col(col_expr).is_in(values_expr));
            }

            if !filter.pattern.is_empty() {
                lazy_df = lazy_df.filter(
                    col(col_expr)
                        .str()
                        .contains(lit(filter.pattern.clone()), true),
                );
            }
        }

        let filtered_df = lazy_df.collect().unwrap();

        Dataset {
            fields: self.fields.clone(),
            df: filtered_df,
        }
    }

    pub fn add_row(&self, data: Array) {
        todo!()
    }

    pub fn update_row(&self, index: usize, data: Array) {
        todo!()
    }

    pub fn swap_rows(&self, old_index: usize, new_index: usize) {
        todo!()
    }

    pub fn remove_rows(&self, indexes: Array) {
        todo!()
    }
    // endregion: Rows
}
