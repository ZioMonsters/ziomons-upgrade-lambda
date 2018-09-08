module.exports = env => ({
  Region: "eu-west-3",
  ConfigOptions: {
    FunctionName: `cryptomon-upgrade-lambda-${env}`,
    Description: "",
    Handler: "index.handler",
    RoleName: `cryptomon-upgrade-lambda-${env}`,
    MemorySize: 128,
    Timeout: 10,
    Runtime: "nodejs8.10",
    Environment: {
      Variables: {
        NODE_ENV: env
      }
    }
  }
})