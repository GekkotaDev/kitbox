use tauri::Manager;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_stronghold::Builder::new(|pass| todo!()).build())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_log::Builder::new().build())
        .setup(|app| {
            let window = app.get_webview_window("main").unwrap();

            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }

            if cfg!(windows) {
                use window_vibrancy::{apply_acrylic, apply_tabbed};
                use winver::WindowsVersion;

                let version = WindowsVersion::detect().unwrap();

                if version >= WindowsVersion::new(10, 0, 22000) {
                    let _ = apply_tabbed(&window, Some(true));
                }

                if version < WindowsVersion::new(10, 0, 18362) {
                    let _ = apply_acrylic(&window, Some((18, 18, 18, 125)));
                }
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
