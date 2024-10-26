use wasm_bindgen::prelude::*;

mod dataset;
mod field;

#[wasm_bindgen]
pub fn initialize() {
    #[cfg(feature = "console_error_panic_hook")]
    console_error_panic_hook::set_once();
}
