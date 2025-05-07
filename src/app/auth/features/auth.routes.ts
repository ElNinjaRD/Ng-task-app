import { Routes } from "@angular/router";
import { privateGuard, publicGuard } from "../../core/auth.guard";

export default [
  {
    path: "sign-in",
    loadComponent: () => import("./sign-in/sign-in.component")
  },
  {
    path: "task",
    loadComponent: () => import("../../task/features/task.routes")
  },

] as Routes;
