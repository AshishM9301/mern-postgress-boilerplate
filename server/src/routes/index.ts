import express from "express";
import api from "./api";
import createHttpError from "http-errors";

const router = express.Router();

router.use("/api", api);

router.use("/api", (req, res, next) => {
  next(
    createHttpError.NotFound(
      "The route you are trying to access does not exist."
    )
  );
});

// eslint-disable-next-line no-unused-vars
router.use(
  (
    error: { status: number; message: string },
    req: any,
    res: {
      status: (arg0: any) => void;
      json: (arg0: { error: { status: any; message: any } }) => void;
    },
    next: any
  ) => {
   
    res.status(error.status || 500);
    return res.json({
      error: {
        status: error.status || 500,
        message: error.message || "Internal Server Error",
      },
    });
  }
);

export default router;
