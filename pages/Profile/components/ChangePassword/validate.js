export const passwordsValidation = values => {
    const errors = {};
    const { current_password, password, password_confirmation } = values;

    if (!current_password) {
        errors.current_password = 'field.error.required';
    } else if (current_password && current_password.length < 8) {
        errors.current_password = 'field.error.password.length';
    }

    if (!password) {
        errors.password = 'field.error.required';
    } else if (password && password.length < 8) {
        errors.password = 'field.error.password.length';
    }

    if (!password_confirmation) {
        errors.password_confirmation = 'field.error.required';
    } else if (password_confirmation && password_confirmation.length < 8) {
        errors.password_confirmation = 'field.error.password.length';
    } else if (password_confirmation && password && password_confirmation !== password) {
        errors.password_confirmation = 'field.error.password.no.match';
    }

    return errors;
};
