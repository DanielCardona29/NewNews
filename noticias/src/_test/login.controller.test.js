import LoginController from '../NewControllers/login.controllers';

const _LoginController = new LoginController();

describe('Test del Login', () => {
    test('Prueba de incio de sesion', () => {
        const data = {
            user: 'Daniel',
            pass: '1234'
        }
        expect(_LoginController.Login(data)).toBeTruthy();
    })

});
