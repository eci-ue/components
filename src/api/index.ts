/**
 * @file 统一 API 交互
 * @author theresia@eci.com
 */

import Task from "./task";
import File from "./file";
import Project from "./project";

export class Http {
  readonly task: Task = new Task();
  readonly file: File = new File();
  readonly project: Project = new Project();
}

export const api = new Http();
