import PreviewUrl from './components/PreviewUrl'
import UrlForm from './components/UrlForm'

const App = () => {
  return (
    <div className='h-screen w-full flex flex-col items-center justify-center gap-5 font-[Poppins]'>
      <UrlForm />
      <PreviewUrl />
    </div>
  )
}

export default App 