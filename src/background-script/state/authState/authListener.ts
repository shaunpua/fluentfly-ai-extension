/* eslint-disable no-case-declarations */
import { supabase } from "../../supabase/supabaseClient";

const authListener = async (message, sendResponse) => {
  console.log("AUTH LISTENER MESSAGE RECEIVED", message.type);

  try {
    switch (message.type) {
      case "SUPABASE_GOOGLE_SIGN_IN":
        const manifest = chrome.runtime.getManifest();

        if (manifest.oauth2 && manifest.oauth2.scopes) {
          console.log("MANIFEST CLIENT ID", manifest.oauth2.client_id);
          const url = new URL("https://accounts.google.com/o/oauth2/auth");
          url.searchParams.set("client_id", manifest.oauth2.client_id);
          url.searchParams.set("response_type", "id_token");
          url.searchParams.set("access_type", "offline");
          url.searchParams.set(
            "redirect_uri",
            `https://${chrome.runtime.id}.chromiumapp.org`
          );
          url.searchParams.set("scope", manifest.oauth2.scopes.join(" "));

          chrome.identity.launchWebAuthFlow(
            {
              url: url.toString(),
              interactive: true,
            },
            async (redirectUri) => {
              if (chrome.runtime.lastError || !redirectUri) {
                sendResponse({
                  success: false,
                  error:
                    chrome.runtime.lastError?.message ||
                    "Authentication failed",
                });
                return;
              }

              // Extract the ID token from the redirect URI.
              const redirectedUrl = new URL(redirectUri);
              const params = new URLSearchParams(
                redirectedUrl.hash.substring(1)
              ); // Remove '#' and parse
              const idToken = params.get("id_token");

              if (idToken) {
                const { data, error } = await supabase.auth.signInWithIdToken({
                  provider: "google",
                  token: idToken,
                });

                if (error) {
                  sendResponse({ success: false, error: error.message });
                } else {
                  sendResponse({ success: true, data });
                }
              } else {
                sendResponse({
                  success: false,
                  error: "No ID token found in redirect URI",
                });
              }
            }
          );
        }

        // eslint-disable-next-line no-case-declarations
        // const { data, error } = await supabase.auth.signInWithOAuth({
        //   provider: "google",
        // });

        // console.log("run google auth", data);

        // if (error) throw error;

        // sendResponse({
        //   success: true,
        //   data: { url: data.url },
        // });
        break;

      case "SUPABASE_EMAIL_SIGN_UP":
        console.log("email form data ", message.value);
        break;

      default:
        console.log("No matching action in settingListener");
        break;
    }
  } catch (error) {
    console.error("Error in authListener", error);
  }
};

export default authListener;
