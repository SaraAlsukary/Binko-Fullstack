
import { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import RatingStars from "../RatingStars/RatingStars";
import { useAppSelector } from "@hooks/app";
import './RatingsModal.css'
export default function RatingsModal({ bookId, userId, confirm }: { bookId: number, userId: number, confirm: () => void }) {
    const [visible, setVisible] = useState(false);
    const { language } = useAppSelector(state => state.language)
    return (
        <div className="card rating-modal flex justify-content-center">
            <Button label={language === 'English' ? "Rating" : "تقييم"} icon="pi pi-star" onClick={() => setVisible(true)} />
            <Dialog header={language === 'English' ? "Rating" : "تقييم"} visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                <RatingStars confirm={confirm} bookId={bookId} userId={userId} />
            </Dialog>
        </div >
    )
}
