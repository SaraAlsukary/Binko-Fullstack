import { Suspense } from 'react'
import LottieHandler from '../lottieHandler/lottieHandler'
import { useAppSelector } from '@hooks/app';
const SuspendPage = ({ children }: { children: React.ReactNode }) => {
    const { language } = useAppSelector(state => state.language);
    return (
        <Suspense fallback={
            <LottieHandler style={{ borderRadius: '100px', width: '200px', height: '200px', margin: '100px auto', color: 'var( --main-bg-light-color)' }} 
            type='Loading' loop={true} message={language === 'English' ? 'Please wait...' : 'ارجوك انتظر قليلاً...'} />

        }>
            {children}
        </Suspense>
    )
}

export default SuspendPage
