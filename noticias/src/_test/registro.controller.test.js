import RegistroController from '../NewControllers/registro.controller.js';

const _RegistroController = new RegistroController();



describe('Test del registro', () => {
    test('Test del comparador de contraseñas', () => {
        const pass = {
            passOne: 'daniel',
            ConfiPass: 'daniel'
        }
        expect(_RegistroController.ValidatePass(pass.passOne, pass.ConfiPass)).toBeTruthy();
    });

    test('Iniciar sesion', () => {
        const entryData = {
            user: "Diego",
            pass: "12544",
            confipass: "12544",
            email: "cardonaddcarddaddandiel@gmail.com"
        };
        expect(_RegistroController.SingUp(entryData)).toBeTruthy();
    });
});
