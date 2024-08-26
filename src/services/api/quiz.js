import axios from '@/plugins/axios/index.js'

const fetchQuizzes = async (page, queryParameters) => {
  const params = {
    'categories[]': queryParameters.category,
    'difficulty-levels[]': queryParameters.difficulty,
    sort: queryParameters.sort,
    order: queryParameters.order,
    'not-completed': queryParameters['not-completed'],
    'my-quizzes': queryParameters['my-quizzes'],
    search: queryParameters.search,
    page: page,
  }

  return await axios.get('/quizzes', { params })
}

const fetchQuiz = async (quizId) => {
  return await axios.get(`/quizzes/${quizId}`)
}

const fetchQuizQuestions = async (quizId) => {
  return await axios.get(`/quizzes/${quizId}/questions`)
}

const fetchSimilarQuizzes = async (quizId) => {
  return await axios.get(`/quizzes/${quizId}/similar`)
}

const fetchCategories = async () => {
  return await axios.get('/categories')
}

const fetchDifficultyLevels = async () => {
  return await axios.get('/difficulty-levels')
}

const startQuiz = async (quizId) => {
  return await axios.post(`/quizzes/${quizId}/start`)
}

const completeQuiz = async (quiz, data) => {
  return await axios.post(`/quizzes/${quiz.id}/complete`, data)

}

export { fetchQuizzes, fetchCategories, fetchDifficultyLevels, fetchQuiz, fetchQuizQuestions, startQuiz, completeQuiz, fetchSimilarQuizzes }

