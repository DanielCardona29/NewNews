import $ from 'jquery';

class AvatarController {
    showButtons() {
        $('#buttons').css({ 'display': 'flex' });
    }
    //
    hiddenButtons() {
        $('#buttons').css({ 'display': 'none' });
    }

}

export default AvatarController;