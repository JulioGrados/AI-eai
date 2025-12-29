import { ChapterView } from '../components/ChapterView'
import { useChapters } from '../../../hooks'

export const ChapterContainer = ({ courseId, chapterId, chapter: fallbackChapter }) => {
  // Obtener el chapter específico con sus versions y favoriteVersion
  const { chapter, loading } = useChapters({ chapterId })

  return (
    <ChapterView
      courseId={courseId}
      chapterId={chapterId}
      chapter={chapter || fallbackChapter}
      loading={loading}
    />
  )
}
