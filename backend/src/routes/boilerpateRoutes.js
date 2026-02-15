import express from "express";
import { reactComponentTemplate } from "../controllers/boilerplateControllers.js";
import { expressRouteTemplate } from "../controllers/boilerplateControllers.js";
import { nodeControllerTemplate } from "../controllers/boilerplateControllers.js";

const router = express.Router();

router.post("/", (req, res) => {
  try {
    const { type, name, props, method, path } = req.body;
    let code = "";

    switch (type) {
      case "react-component":
        code = reactComponentTemplate(name, props);
        break;
      case "express-route":
        code = expressRouteTemplate(name, method, path);
        break;
      case "node-controller":
        code = nodeControllerTemplate(name);
        break;
      default:
        return res.status(400).json({ error: "Invalid boilerplate type" });
    }
    res.json({ code });
  } catch (error) {
    res.status(500).json({ msg: "Error fetching boilerplate" });
  }
});

export default router;
