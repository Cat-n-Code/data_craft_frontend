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
