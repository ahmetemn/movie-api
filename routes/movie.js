var express = require('express');
var router = express.Router();

// bunun için öncelikle model dosyamızı sayafaya import etmemiz gerekir 
const Movie = require("../models/Movie.js")
router.post('/', (req, res, next) => {

  ///request nesnesinin altında body altın bir obje var  bu obje bizim göndermiş olduğumuz post bodysini burda barındırır

  const { title, imdb_score, category, country, year } = req.body;

  const movie = new Movie({
    title: title,
    imdb_score: imdb_score,
    category: category,
    country: country,
    year: year
  });


  /// ilk önce git db de     mongoose.Promise = global.Promise;   bu kodu yaz 
  const promise = movie.save(); /// datayı mongo db ye kaydetme işlemi 
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })

})
router.get("/", (req, res) => {
  ///ilk parametreyi {} boş geçtik 
  const promise = Movie.find({})
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {

    res.json(err)
  })

});


router.get('/:movie_id', (req, res, next) => {
  /// Id yi nasıl alcam : params altında biriktilirmektedir. 

  const promise = Movie.findById(req.params.movie_id);
 
  promise.then((movie)=>{
    res.json(movie);
  }).catch(() => {
    res.json({message:'the film was not found'});
  })

});


//How can we update films detail ?  
router.put('/:movie_id', (req, res, next) => {
  //this function must  have  two parameters /////First= paramaters movie_id , Second= parameters new post data
  const promise = Movie.findByIdAndUpdate(req.params.movie_id, req.body);
  promise.then((movie) => {
    res.json(movie);
  }).catch(() => {
    res.json({message:'the film was not found'});
  });
});




module.exports = router;
