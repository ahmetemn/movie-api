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

    res.json(data)
  }).catch((err) => {

    res.json(err)
  })

});

///Top 10 list 

router.get('/top10', (req, res) => {
  //sorting from largest to smallest
  const promise = Movie.find({}).limit(10).sort({ imdb_score: -1 });
  promise.then((data) => {
    res.json(data)
  }).catch((err) => {
    res.json(err)
  })

})

router.get('/:movie_id', (req, res, next) => {
  /// Id yi nasıl alcam : params altında biriktilirmektedir. 
  const promise = Movie.findById(req.params.movie_id);

  promise.then((movie) => {
    if (!movie) {
      next({ message: "The movie was not found" })
    }
    else {
      res.json(movie)
    }
  }).catch((err) => {
    res.json(err);
  })

});


//How can we update films detail ?  
router.put('/:movie_id', (req, res, next) => {
  //this function must  have  Three parameters /////First= paramaters movie_id , Second= parameters new post data , Third = parameters instant change
  const promise = Movie.findByIdAndUpdate(req.params.movie_id, req.body, { new: true });
  promise.then((movie) => {
    if (!movie) {
      next({ message: "The movie was not found" })
    }
    else {
      res.json(movie)
    }
  }).catch((err) => {
    res.json(err);
  })
});


///How can we delete film 
router.delete('/:movie_id', (req, res, next) => {
  const promise = Movie.findByIdAndRemove(req.params.movie_id)

  promise.then((movie) => {
    if (!movie) {
      next({ message: "The movie was not found" })
    }
    else {
      res.json(movie)
    }

  }).catch((err) => {
    res.json(err)
  })
})

///Between year
router.get('/between/:start_year/:end_year', (req, res) => {
    const{start_year , end_year} = req.params
  const promise = Movie.find({
            ///$gte means: greater or equal
          ///$lte means: less than or equal
          year:{"$gte": parseInt(start_year ),"$lte":parseInt(end_year)}

  });

  promise.then((movie) => {

    res.json(movie)

  }).catch((err) => {
    res.json(err)
  });
});



module.exports = router;
