exports.queryFunction = async function (queryText) {
  const { default: fetch } = await import('node-fetch');
  const bearerToken = "Bearer "+ process.env.TOKEN_STRING;
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
        body: queryText,
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
