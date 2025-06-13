/*export const fetchPost = async (path) => {
    try {
        const response = await fetch(path, {
            method: 'POST'
            // Do NOT send headers or body
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Try to parse as JSON, or fallback to text if needed
        let result;
        try {
            result = await response.json();
        } catch {
            result = await response.text();
        }
        return result; 
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
*/
export const fetchPost = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        // Optionally parse error details from response
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}\n${errorText}`);
      }
  
      // Try to parse as JSON, fallback to text if not JSON
      let result;
      try {
        result = await response.json();
      } catch {
        result = await response.text();
      }
      return result;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
  export const fetchGet = async (url) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        // Optionally parse error details from response
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}\n${errorText}`);
      }
  
      // Try to parse as JSON, fallback to text if not JSON
      let result;
      try {
        result = await response.json();
      } catch {
        result = await response.text();
      }
      return result;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };