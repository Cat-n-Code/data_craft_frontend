use js_sys::{Date, Number};
use polars::prelude::AnyValue;
use wasm_bindgen::JsValue;

pub fn any_value_to_js_value(any_value: AnyValue) -> JsValue {
    match any_value {
        AnyValue::String(s) => s.into(),
        AnyValue::UInt8(i) => i.into(),
        AnyValue::UInt16(i) => i.into(),
        AnyValue::UInt32(i) => i.into(),
        AnyValue::UInt64(i) => i.into(),
        AnyValue::Int8(i) => i.into(),
        AnyValue::Int16(i) => i.into(),
        AnyValue::Int32(i) => i.into(),
        AnyValue::Int64(i) => i.into(),
        AnyValue::Float32(f) => f.into(),
        AnyValue::Float64(f) => f.into(),
        AnyValue::Date(d) => Date::new(&(d as f64 * 24.0 * 3600.0 * 1000.0).into()).into(),
        AnyValue::Time(t) => Date::new(&(t as f64 / 1000.0).into()).into(),
        AnyValue::Datetime(t, unit, name) => Date::new(&(t as f64 / 1000.0).into()).into(),
        _ => JsValue::null(),
    }
}
