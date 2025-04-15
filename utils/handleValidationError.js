async function handleValidationError(err, req, res, view, extra = {}) {
    if (err.name === 'ValidationError') {
        const tasks = await require('../models/task').find().lean();
        const errors = Object.values(err.errors).map(e => e.message);

        return res.status(400).render(view, {
            title: 'TODO List',
            tasks,
            errors,
            formData: req.body,
            ...extra
        });
    } else {
        console.error('Unexpected error:', err);
        return res.status(500).send('Internal Server Error');
    }
}

module.exports = handleValidationError;
