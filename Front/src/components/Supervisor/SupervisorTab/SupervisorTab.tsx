import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import AcceptedBooks from '../BooksSuperAccept/Book';
import Comment from '../CommentsSuper/Comment'
import Category from '../CategorySuper/Category'
import Book from '../BooksSuper/Book';
import TopBooks from '../TopBooks/Book';
import BooksArabic from '../BooksArabic/Book';
import BooksForeign from '../BooksForeign/Book';
import './SupervisorTab.css'
import { useAppSelector } from '@hooks/app';
import  Chapters from '@components/Supervisor/UnacceptedChapters/Chapters';


function LeftTabsExample() {
    const { language } = useAppSelector(state => state.language);

    return (
        <div className='tabCont'>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
                <h5> <i className='pi pi-wrench'></i> {language === 'English' ? 'Settings' : 'الاعدادات'}</h5>
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item >
                                <Nav.Link eventKey="first">{language === 'English' ? 'Categories' : 'التصنيفات'}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item >
                                <Nav.Link eventKey="second">{language === 'English' ? 'Comments' : 'التعليقات'}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third">{language === 'English' ? 'Books' : 'الكتب'}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="fourth">{language === 'English' ? 'Accepted Books' : 'الكتب المنشورة'}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="five">{language === 'English' ? 'Top Books' : 'أفضل الكتب'}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="six">{language === 'English' ? 'Arabic Books' : 'الكتب العربية'}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="seven">{language === 'English' ? 'English Books' : 'الكتب الانجليزية '}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item >
                                <Nav.Link eventKey="eight">{language === 'English' ? 'Unaccepted chapters' : 'الفصول'}</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first"><Category /></Tab.Pane>
                            <Tab.Pane eventKey="second"><Comment /></Tab.Pane>
                            <Tab.Pane eventKey="third"><Book /></Tab.Pane>
                            <Tab.Pane eventKey="fourth"><AcceptedBooks /></Tab.Pane>
                            <Tab.Pane eventKey="five"><TopBooks /></Tab.Pane>
                            <Tab.Pane eventKey="six"><BooksArabic /></Tab.Pane>
                            <Tab.Pane eventKey="seven"><BooksForeign /></Tab.Pane>
                            <Tab.Pane eventKey="eight"><Chapters /></Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>

            </Tab.Container>
        </div>
    );
}

export default LeftTabsExample;