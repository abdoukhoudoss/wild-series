import express from "express";

import categoryActions from "./modules/category/categoryActions";
// Import actions
import itemActions from "./modules/item/itemActions";
import programActions from "./modules/program/programActions";
import sayActions from "./modules/say/sayActions";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

router.get("/api/programs", programActions.browse);
router.get("/api/programs/:id", programActions.read);
router.get("/api/categories", categoryActions.browse);
router.get("/api/categories/:id", categoryActions.read);

// Items routes
router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

// Welcome route
router.get("/", sayActions.sayWelcome);

export default router;
