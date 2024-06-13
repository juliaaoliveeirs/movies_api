const AppError = require('../utils/AppError')
const knex = require('../database/knex')

class MovieNotesController {
  async create(request, response) {
    const { title, description, rating, tags } = request.body
    const { user_id } = request.params

    if (rating < 1 || rating > 5) {
      throw new AppError('A nota do filme precisa estar entre 1 e 5.')
    }

    const [movie_notes_id] = await knex('movie_notes').insert({
      title,
      description,
      user_id,
    })

    const tagsInsert = tags.map((tag) => {
      return {
        movie_notes_id,
        name: tag,
        user_id,
      }
    })

    await knex('movie_tags').insert(tagsInsert)

    return response.json({ message: 'Filme incluído com sucesso' })
  }

  async show(request, response) {
    const { id } = request.params

    const movie_notes = await knex('movie_notes').where({ id }).first()
    const movie_tags = await knex('movie_tags').where({ movie_notes_id: id })

    return response.json({
      ...movie_notes,
      movie_tags,
    })
  }

  async delete(request, response) {
    const { id } = request.params

    await knex('movie_notes').where({ id }).delete()

    return response.json({ message: 'Filme deletado com sucesso' })
  }

  async index(request, response) {
    const { user_id, title, tags } = request.query

    let movies

    if (tags) {
      const filterTags = tags.split(',').map((tag) => tag.trim())

      movies = await knex('movie_tags')
        .select(['movie_notes.id', 'movie_notes.title', 'movie_notes.user_id'])
        .where('movie_notes.user_id', user_id)
        .whereLike('movie_notes.title', `%${title}%`)
        .whereIn('name', filterTags)
        .innerJoin('movie_notes', 'movie_notes.id', 'movie_tags.movie_notes_id')
        .orderBy('title')
    } else {
      movies = await knex('movie_notes')
        .where({ user_id })
        .whereLike('title', `%${title}%`)
        .orderBy('title')
    }

    const userMovieTags = await knex('movie_tags').where({ user_id })
    const moviesWithTags = movies.map((movie) => {
      const movieTags = userMovieTags.filter(
        (tag) => tag.movie_notes_id === movie.id,
      )

      return {
        ...movie,
        tags: movieTags,
      }
    })

    return response.json(moviesWithTags)
  }
}

module.exports = MovieNotesController
