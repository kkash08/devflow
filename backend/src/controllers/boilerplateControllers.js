export function reactComponentTemplate(name, props) {
  const propsString = props && props.length > 0 ? props.join(", ") : "";
  return `
  import React from 'react';
  
  const ${name} = ({ ${propsString} }) => {
    return (
      <div>
        <h1>${name} Component</h1>
      </div>
    );
  };
  
  export default ${name};
    `;
}

export function expressRouteTemplate(name, method = "get", path = "/") {
  return `
  app.${method.toLowerCase()}('${path}', (req, res) => {
    // your logic here
    res.send("${name} route working!");
  });
    `;
}

export function nodeControllerTemplate(name) {
  return `
  export ${name} = (req, res) => {
    try {
      // your logic here
      res.status(200).json({ message: "${name} executed successfully!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
    `;
}
