import './NotFoundPage.css';

import { useHistory} from 'react-router-dom' 

function NotFoundPage() {
    const history = useHistory();

    function handleGoBack() {
        history.goBack();
    }

    return (
    <div className="not-found">
        <div className="not-found__text-wrapper">
            <h1 className="not-found__heading">404</h1>
            <p className="not-found__paragraph">Страница не найдена</p>
        </div>
        <button onClick={handleGoBack} type="button" className="not-found__link">Назад</button>
        
    </div>
  );
}

export default NotFoundPage;
