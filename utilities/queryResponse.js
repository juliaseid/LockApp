const tokenString = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkdMWGtaazBFVzc3eEZhd1cxZHlpRSJ9.eyJnaXZlbl9uYW1lIjoiSnVsaWEiLCJmYW1pbHlfbmFtZSI6IlNlaWRtYW4iLCJuaWNrbmFtZSI6Imp1bGlhIiwibmFtZSI6Ikp1bGlhIFNlaWRtYW4iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFUWEFKd2wtSXQtYTdvOFBFOHh0VlYzU0ZDV1FxY0JFMFVhN3lHdUlsNnQ9czk2LWMiLCJsb2NhbGUiOiJlbiIsInVwZGF0ZWRfYXQiOiIyMDIyLTA1LTIwVDE4OjQ0OjQ1LjY2MVoiLCJlbWFpbCI6Imp1bGlhQGV2ZXJ5ZGV2ZWxvcGVyLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL3dpbHNvbmh1Z2hlcy51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDcxNzg2NjE5NTcwMTMxODgxMzgiLCJhdWQiOiJKdnhqOEhZM3pJdHVpQjlocm1PRmZJWWgxcENFVlp1ZiIsImlhdCI6MTY1MzA3MjI4NiwiZXhwIjoxNjU1NjY0Mjg2LCJub25jZSI6IjJlNDJjZjI4NzkzZGVhNmE4NTFmYTc3MDEzNTNkNTJhIn0.rX9Fz2TDc2O4E50836aU-1zanFLyTCBkZJoSLMMe8z0rGqCvyprC60DtGIn_gfW1aqiHNjHhVwkNYCKlSTGFiXI1MPvK7Aw4McJQBEEwvpd6lowz82i_17Is62q4QF2Bd4UvcZqWn7TiNjrPiOKWTX9kHungIJARFGnM7fNY8MBArmKYNEHTR8gIw8gg_a1z5Pow6Z-0T7MWDj7J_Jplbob25D906SkGs1tZdhV1_hijjwYuyhH430awXsGVS4kG0hihnFpkXnr6IhDsb--XsyLBy-7SsVsOOVRFhqL13uI-Rb4CyiGB8mku7AVyxJWisAjoIg07GQWH7trr-Q24sg";

async function queryResponse (query) {
  const { default: fetch } = await import('node-fetch');
  const bearerToken = "Bearer "+ tokenString;
  const headers = {
    "Content-Type": "application/json",
    "Authorization": bearerToken,
  }
  try {
    const response = await fetch (
      'https://platform.yonomi.cloud/graphql',
      {
        method: 'POST',
        headers: headers,
        body: query,
      }
    )
      if(response.ok) {
        return response.json();
      }
      else {
        throw new Error (`Response Status: ${response.status} (${response.statusText})`);
      }
  } catch (err) {
    console.log(err);
  } 
};

module.exports = {queryResponse};