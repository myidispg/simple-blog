const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => { console.log(`Listening on port ${port}`); });

app.get('/api/express_backend', (req, res) => {
    console.log(`Got a hit. Req: ${req}`);
    res.send({ message: "Welcome to express" });
});
