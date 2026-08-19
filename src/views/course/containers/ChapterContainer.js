import { ChapterView } from '../components/ChapterView'
import { useChapters } from '../../../hooks'

export const ChapterContainer = ({ courseId, chapterId, chapter: fallbackChapter }) => {
  // Obtener el chapter específico con sus versions y favoriteVersion
  const { chapter, loading, ready } = useChapters({ chapterId })

  // El store guarda un solo capítulo "actual": si es el de otra pantalla,
  // se ignora hasta que llegue el correcto
  const isCurrentChapter = chapter && chapter._id === chapterId

  return (
    <ChapterView
      key={chapterId}
      courseId={courseId}
      chapterId={chapterId}
      chapter={isCurrentChapter ? chapter : fallbackChapter}
      loading={loading || !ready || !isCurrentChapter}
    />
  )
}
