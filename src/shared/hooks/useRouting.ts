import { useNavigate } from 'react-router'

export const useRouter = () => {
  const navigate = useNavigate()

  return {
    replace: (url: string) => navigate(url, { replace: true }),
    push: (url: string) => navigate(url),
    goBack: () => navigate(-1),
  }
}
