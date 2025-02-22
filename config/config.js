const Config = {
  serverUrl:
    import.meta.env.VITE_BASE_DEBUG === "TRUE"
      ? import.meta.env.VITE_BASE_DEV_SERVER_URL
      : import.meta.env.VITE_BASE_PROD_SERVER_URL,
  singleEvalUrl: import.meta.env.VITE_BASE_SINGLE_EVAL_URL,
  doubleEvalUrl: import.meta.env.VITE_BASE_DOUBLE_EVAL_URL,
  tripleEvalUrl: import.meta.env.VITE_BASE_TRIPLE_EVAL_URL,
  backTestUrl: import.meta.env.VITE_BASE_BACK_TEST_URL,
  singlePredUrl: import.meta.env.VITE_BASE_SINGLE_PREDICTOR_URL,
  signupUrl: import.meta.env.VITE_BASE_SIGNUP_URL,
  loginUrl: import.meta.env.VITE_BASE_LOGIN_URL,
  loginRoute: import.meta.env.VITE_BASE_LOGIN_ROUTE,
  leaderboardSingleUrl: import.meta.env.VITE_BASE_LEADERBOARD_SINGLE_URL,
  leaderboardDoubleUrl: import.meta.env.VITE_BASE_LEADERBOARD_DOUBLE_URL,
  leaderboardTripleUrl: import.meta.env.VITE_BASE_LEADERBOARD_TRIPLE_URL,

};
export default Config;
