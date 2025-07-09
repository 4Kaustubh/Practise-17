# from RealtimeSTT import AudioToTextRecorder
# import time
# import sys

# from RealtimeSTT_server.stt_server import silence_timing


# # Callback function to print real-time transcription updates
# def print_realtime_transcription(text):
#     # Using sys.stdout.write and '\r' (carriage return)
#     # allows the text on the current line to be overwritten,
#     # giving a continuous update feel.
#     sys.stdout.write(f"\rReal-time: {text}                     ")  # Pad with spaces to clear old text
#     sys.stdout.flush()


# # Callback function for when a complete sentence/utterance is finalized
# def print_stabilized_transcription(text):
#     # Move to the next line for the finalized text
#     sys.stdout.write(f"\rFinal: {text}\n")
#     sys.stdout.flush()


# def on_vad_start():
#     print("\n--- VAD Detected Speech Start ---")


# def on_vad_end():
#     print("\n--- VAD Detected Speech End ---")


# def main():
#     print("Starting main function...")

#     recorder = None

#     try:
#         recorder = AudioToTextRecorder(
#             model="tiny",
#             language="en",
#             # input_device_index=desired_device_index,
#             enable_realtime_transcription=True,
#             on_realtime_transcription_update=print_realtime_transcription,
#             on_realtime_transcription_stabilized=print_stabilized_transcription,
#             on_vad_detect_start=on_vad_start,
#             on_vad_detect_stop=on_vad_end,
#             realtime_processing_pause=0.3,
#         )
#         print("AudioToTextRecorder initialized successfully.")
#         print("Ready to transcribe. Speak now...")
#         print("Press Ctrl+C to stop.")

#         while True:
#             time.sleep(0.1)

#     except KeyboardInterrupt:
#         print("\nStopping transcription.")
#     except Exception as e:
#         print(f"\n!!!! An UNEXPECTED ERROR occurred during initialization or runtime: {e}")
#         # Print the full traceback for more details
#         import traceback

#         traceback.print_exc()
#         print("\nSuggestions:")
#         print("1. Re-check microphone connection and system input levels.")
#         print("2. Run 'python -m sounddevice' to verify device indices and connectivity.")
#         print("3. Check microphone permissions in your OS privacy settings.")
#         print("4. Try removing 'input_device_index' parameter to use default microphone.")
#         print(
#             "5. Consider deleting VAD model cache and retrying (rm -rf ~/.cache/torch/hub/snakers4_silero-vad_master)."
#         )
#     finally:
#         if recorder is not None:
#             recorder.shutdown()
#             print("RealtimeSTT shut down.")


# if __name__ == "__main__":
#     main()
from RealtimeSTT import AudioToTextRecorder
import sys
import time

# --- Callbacks for Real-time STT ---


# This callback will give you the most "real-time" updates.
# Text here is *unstable* and might change as more audio is processed.
def on_realtime_transcription_update_callback(text):
    sys.stdout.write(f"\rReal-time (unstable): {text}                     ")
    sys.stdout.flush()


# This callback will give you the final, stabilized text for an utterance.
def on_realtime_transcription_stabilized_callback(text):
    sys.stdout.write(f"\rFinal (stabilized): {text}\n")
    sys.stdout.flush()


# VAD callbacks for debugging and understanding when speech is detected
def on_vad_start_callback():
    sys.stdout.write("\n--- VAD Detected Speech Start ---\n")
    sys.stdout.flush()


def on_vad_end_callback():
    sys.stdout.write("\n--- VAD Detected Speech End ---\n")
    sys.stdout.flush()


if __name__ == "__main__":
    print("Wait until it says 'Ready to transcribe. Speak now...'")

    # It's good practice to explicitly define parameters for clarity and control.
    # Set to None to use the system default microphone.
    # Or set to your specific device index (e.g., 4) if needed.
    # input_device_to_use = None

    try:
        # print(f"Attempting to initialize AudioToTextRecorder. Device index: {input_device_to_use if input_device_to_use is not None else 'Default'}")

        recorder = AudioToTextRecorder(
            model="tiny",  # Use "tiny" for fastest real-time performance
            language="en",  # Specify language for better accuracy
            # Pass input_device_index if it's not None
            # **({'input_device_index': input_device_to_use} if input_device_to_use is not None else {}),
            # Crucial for enabling real-time updates through callbacks
            enable_realtime_transcription=True,
            # Assign your callback functions here
            on_realtime_transcription_update=on_realtime_transcription_update_callback,
            on_realtime_transcription_stabilized=on_realtime_transcription_stabilized_callback,
            on_vad_detect_start=on_vad_start_callback,
            on_vad_detect_stop=on_vad_end_callback,
            # Adjust this for more frequent (smaller chunk) updates.
            # Lower values mean more updates, but higher CPU usage. Experiment!
            realtime_processing_pause=0.2,
        )

        print("AudioToTextRecorder initialized successfully.")
        print("Ready to transcribe. Speak now...")
        print("Press Ctrl+C to stop.")

        # This loop simply keeps the main thread alive.
        # The transcription and callbacks happen in background threads managed by RealtimeSTT.
        while True:
            time.sleep(0.1)  # Small sleep to prevent busy-waiting

    except KeyboardInterrupt:
        print("\nStopping transcription.")
    except Exception as e:
        print(f"\n!!!! An UNEXPECTED ERROR occurred: {e}")
        import traceback

        traceback.print_exc()
        print("\n--- Debugging Suggestions ---")
        print(
            "1. **Microphone Check:** Use system tools (Voice Memos, Sound Recorder) to confirm your microphone is recording clearly and loudly."
        )
        print(
            "2. **Device Index:** Run 'python -m sounddevice' to list devices. Ensure 'input_device_to_use' is correct, or set to `None`."
        )
        print("3. **Permissions:** Double-check microphone permissions for your terminal/IDE in OS privacy settings.")
        print(
            "4. **VAD Model Cache:** Delete the Silero VAD model cache: `rm -rf ~/.cache/torch/hub/snakers4_silero-vad_master` and rerun to force re-download."
        )
        print(
            "5. **RealtimeSTT Version:** Ensure `RealtimeSTT` is up-to-date: `uv pip install --upgrade RealtimeSTT[all]`"
        )
        print(
            "6. **PortAudio/Sounddevice:** Ensure PortAudio development headers are installed and sounddevice is correctly built."
        )
        print("-----------------------------")
    finally:
        if "recorder" in locals() and recorder is not None:
            recorder.shutdown()
            print("RealtimeSTT shut down.")
