import { render, screen } from '@testing-library/react';
import Home from './Home';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { BrowserRouter } from 'react-router-dom';

test('Render Home', () => {
    render(
    <BrowserRouter>
    <Provider store={store}><Home/></Provider>
    </BrowserRouter>
    );
    const searchBar = screen.getByPlaceholderText(/Search breed/i);
    expect(searchBar).toBeInTheDocument();
})