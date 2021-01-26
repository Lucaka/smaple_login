export function recursionRouter(userRouter = [], allRouter = []) {
  let realRoutes = [];
  allRouter.forEach((v) => {
    userRouter.forEach((item) => {
      if (item.name === v.name) {
        if (item.children && item.children.length > 0) {
          v.children = recursionRouter(item.children, v.children)
        }
        realRoutes.push(v)
      }
    })
  });

  return realRoutes
}