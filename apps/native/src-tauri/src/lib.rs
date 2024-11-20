use tauri::Manager;
// use tauri::WindowEvent;

use tauri_plugin_decorum::WebviewWindowExt;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_window_state::Builder::new().build())
        // .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_stronghold::Builder::new(|_pass| todo!()).build())
        .plugin(tauri_plugin_os::init())
        // .plugin(tauri_plugin_log::Builder::new().build())
        .setup(|app| {
            let window = app.get_webview_window("main").unwrap();
            window.create_overlay_titlebar().unwrap();

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

                // window.on_window_event(|event| {
                //     if let WindowEvent::Resized(..) = event {
                //         std::thread::sleep(std::time::Duration::from_millis(1))
                //     }
                // });

                let version = WindowsVersion::detect().unwrap();

                if version >= WindowsVersion::new(10, 0, 22000) {
                    let _ = apply_tabbed(&window, Some(true));
                }

                if version < WindowsVersion::new(10, 0, 18362) {
                    let _ = apply_acrylic(&window, Some((18, 18, 18, 125)));
                }
            }

            #[cfg(target_os = "macos")] {
              // Set a custom inset to the traffic lights
              main_window.set_traffic_lights_inset(12.0, 16.0).unwrap();
      
              // Make window transparent without privateApi
              main_window.make_transparent().unwrap()
      
              // Set window level
              // NSWindowLevel: https://developer.apple.com/documentation/appkit/nswindowlevel
              main_window.set_window_level(25).unwrap()
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
