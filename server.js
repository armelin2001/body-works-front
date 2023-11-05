const expresso = requer('expresso');
const caminho = require('caminho');
const app=express();
app.use(express.static(__dirname + '/dist/body-works-front'));
app.get('/*', function(req,res) {
res.sendFile(caminho.join(__dirname+
'/dist/body-works-front/index.html'));});
app.listen(process.env.PORT || 8080);