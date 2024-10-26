use std::convert::TryFrom;

use polars::prelude::{DataType, TimeUnit};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Clone, Copy)]
pub enum FieldType {
    Text,
    Integer,
    Float,
    Date,
    Time,
    DateTime,
}

impl TryFrom<DataType> for FieldType {
    type Error = JsValue;

    fn try_from(value: DataType) -> Result<Self, Self::Error> {
        match value {
            DataType::UInt8
            | DataType::UInt16
            | DataType::UInt32
            | DataType::UInt64
            | DataType::Int8
            | DataType::Int16
            | DataType::Int32
            | DataType::Int64 => Ok(FieldType::Integer),
            DataType::Float32 | DataType::Float64 => Ok(FieldType::Float),
            DataType::String => Ok(FieldType::Text),
            DataType::Date => Ok(FieldType::Date),
            DataType::Time => Ok(FieldType::Time),
            DataType::Datetime(u, name) => Ok(FieldType::DateTime),
            _ => Err("Unsupported data type".into()),
        }
    }
}

impl Into<DataType> for FieldType {
    fn into(self) -> DataType {
        match self {
            FieldType::Text => DataType::String,
            FieldType::Integer => DataType::Int64,
            FieldType::Float => DataType::Float64,
            FieldType::Date => DataType::Date,
            FieldType::Time => DataType::Time,
            FieldType::DateTime => DataType::Datetime(TimeUnit::Milliseconds, None),
        }
    }
}

#[wasm_bindgen]
#[derive(Clone, Copy)]
pub enum FieldAggregator {
    Count,
    Min,
    Max,
    Sum,
    Mean,
}

#[wasm_bindgen]
#[derive(Clone)]
pub struct FieldInfo {
    name: String,
    date_type: FieldType,
    is_required: bool,
}

#[wasm_bindgen]
impl FieldInfo {
    pub fn new(name: String, date_type: FieldType, is_required: bool) -> Self {
        Self {
            name,
            date_type,
            is_required,
        }
    }

    pub fn name(&self) -> String {
        self.name.clone()
    }

    pub fn date_type(&self) -> FieldType {
        self.date_type
    }

    pub fn is_required(&self) -> bool {
        self.is_required
    }
}
