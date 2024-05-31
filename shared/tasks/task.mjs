/**
 * Creates a Gulp task with display name
 */
export function name(displayName, taskFn) {
  taskFn.displayName = displayName
  return taskFn
}
