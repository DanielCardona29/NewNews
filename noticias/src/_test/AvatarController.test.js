import AvatarController from '../Controllers/AvatarController.js'
const AvatarController2 = new AvatarController();

test('Obtener el avatar de un usuario', () => {
    expect(AvatarController2.gettAvatar('50u2x1aogke52qvvk')).not.toBe(false);
});