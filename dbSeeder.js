//models
var User = require('./models/User');
var Movie = require('./models/Movie');

//Save objects into database in bulk
function save(array) {
  var arrayLength = array.length;
  for (var i = 0; i < array.length; i++) {
    array[i].save(function (error) {
      if (error) throw error;
    })
  }
};

//seed database if empty
exports.seed = function (db) {
  var m1 = Movie({
        id: "10-things-i-hate-about-you",
        title: "10 Things I Hate About You",
        description: "A new kid must find a guy to date the meanest girl in school, the older sister of the girl he has a crush on, who cannot date until her older sister does.",
        content: {
          videoUrl: "http://d2bqeap5aduv6p.cloudfront.net/project_coderush_640x360_521kbs_56min.mp4",
          imageUrl: "01.jpg",
        },
        dateCreated: new Date(),
        dateUpdated: new Date(),
      })

      var m2 = Movie({
        id: "12-years-a-slave",
        title: "12 years a slave",
        description: "In the antebellum United States, Solomon Northup, a free black man from upstate New York, is abducted and sold into slavery.",
        content: {
          videoUrl: "http://d2bqeap5aduv6p.cloudfront.net/project_coderush_640x360_521kbs_56min.mp4",
          imageUrl: "02.jpg",
        },
        dateCreated: new Date(),
        dateUpdated: new Date(),
      })

      var m3 = Movie({
        id: "2-guns",
        title: "2 Guns",
        description: "A DEA agent and a naval intelligence officer find themselves on the run after a botched attempt to infiltrate a drug cartel. While fleeing, they learn the secret of their shaky alliance: Neither knew that the other was an undercover agent.",
        content: {
          videoUrl: "http://d2bqeap5aduv6p.cloudfront.net/project_coderush_640x360_521kbs_56min.mp4",
          imageUrl: "03.jpg",
        },
        dateCreated: new Date(),
        dateUpdated: new Date(),
      })

      var m4 = Movie({
        id: "2001-a-space-odyssey",
        title: "2001: A Space Odyssey",
        description: "Humanity finds a mysterious, obviously artificial, object buried beneath the Lunar surface and, with the intelligent computer H.A.L. 9000, sets off on a quest.",
        content: {
          videoUrl: "http://d2bqeap5aduv6p.cloudfront.net/project_coderush_640x360_521kbs_56min.mp4",
          imageUrl: "04.jpg",
        },
        dateCreated: new Date(),
        dateUpdated: new Date(),
      })

      var m5 = Movie({
        id: "21-jump-street",
        title: "21 Jump Street",
        description: "A pair of underachieving cops are sent back to a local high school to blend in and bring down a synthetic drug ring.",
        content: {
          videoUrl: "http://d2bqeap5aduv6p.cloudfront.net/project_coderush_640x360_521kbs_56min.mp4",
          imageUrl: "05.jpg",
        },
        dateCreated: new Date(),
        dateUpdated: new Date(),
      })

      var m6 = Movie({
        id: "22-jump-street",
        title: "22 Jump Street",
        description: "After making their way through high school (twice), big changes are in store for officers Schmidt and Jenko when they go deep undercover at a local college",
        content: {
          videoUrl: "http://d2bqeap5aduv6p.cloudfront.net/project_coderush_640x360_521kbs_56min.mp4",
          imageUrl: "06.jpg",
        },
        dateCreated: new Date(),
        dateUpdated: new Date(),
      })

      var m7 = Movie({
        id: "28-days-later",
        title: "28 Days Later...",
        description: "Four weeks after a mysterious, incurable virus spreads throughout the UK, a handful of survivors try to find sanctuary.",
        content: {
          videoUrl: "http://d2bqeap5aduv6p.cloudfront.net/project_coderush_640x360_521kbs_56min.mp4",
          imageUrl: "07.jpg",
        },
        dateCreated: new Date(),
        dateUpdated: new Date(),
      })

      var m8 = Movie({
        id: "3-days-to-kill",
        title: "3 Days to Kill",
        description: "A dying CIA agent trying to reconnect with his estranged daughter is offered an experimental drug that could save his life in exchange for one last assignment.",
        content: {
          videoUrl: "http://d2bqeap5aduv6p.cloudfront.net/project_coderush_640x360_521kbs_56min.mp4",
          imageUrl: "08.jpg",
        },
        dateCreated: new Date(),
        dateUpdated: new Date(),
      })

      var m9 = Movie({
        id: "300",
        title: "300",
        description: "King Leonidas and a force of 300 men fight the Persians at Thermopylae in 480 B.C.",
        content: {
          videoUrl: "http://d2bqeap5aduv6p.cloudfront.net/project_coderush_640x360_521kbs_56min.mp4",
          imageUrl: "09.jpg",
        },
        dateCreated: new Date(),
        dateUpdated: new Date(),
      })

      var m10 = Movie({
        id: "300-rise-of-an-empire",
        title: "300: Rise of an Empire",
        description: "Greek general Themistokles leads the charge against invading Persian forces led by mortal-turned-god Xerxes and Artemisia, vengeful commander of the Persian navy.",
        content: {
          videoUrl: "http://d2bqeap5aduv6p.cloudfront.net/project_coderush_640x360_521kbs_56min.mp4",
          imageUrl: "10.jpg",
        },
        dateCreated: new Date(),
        dateUpdated: new Date(),
      })
      
      var m11 = Movie({
        id: "47-ronin",
        title: "47 Ronin",
        description: "A band of samurai set out to avenge the death and dishonor of their master at the hands of a ruthless shogun.",
        content: {
          videoUrl: "http://d2bqeap5aduv6p.cloudfront.net/project_coderush_640x360_521kbs_56min.mp4",
          imageUrl: "11.jpg",
        },
        dateCreated: new Date(),
        dateUpdated: new Date(),
      })
      
      var m12 = Movie({
        id: "a-clockwork-orange",
        title: "A Clockwork Orange",
        description: "In future Britain, charismatic delinquent Alex DeLarge is jailed and volunteers for an experimental aversion therapy developed by the government in an effort to solve society's crime problem - but not all goes according to plan.",
        content: {
          videoUrl: "http://d2bqeap5aduv6p.cloudfront.net/project_coderush_640x360_521kbs_56min.mp4",
          imageUrl: "12.jpg",
        },
        dateCreated: new Date(),
        dateUpdated: new Date(),
      })
      
      var m13 = Movie({
        id: "a-girl-walks-home-alone-at-night",
        title: "A Girl Walks Home Alone at Night",
        description: "In the Iranian ghost-town Bad City, a place that reeks of death and loneliness, the townspeople are...",
        content: {
          videoUrl: "http://d2bqeap5aduv6p.cloudfront.net/project_coderush_640x360_521kbs_56min.mp4",
          imageUrl: "13.jpg",
        },
        dateCreated: new Date(),
        dateUpdated: new Date(),
      })
      
      var m14 = Movie({
        id: "a-nightmare-on-elm-street-2010",
        title: "A Nightmare on Elm Street",
        description: "A re-imagining of the horror icon Freddy Krueger, a serial-killer who wields a glove with four blades embedded in the fingers and kills people in their dreams, resulting in their real death in reality.",
        content: {
          videoUrl: "http://d2bqeap5aduv6p.cloudfront.net/project_coderush_640x360_521kbs_56min.mp4",
          imageUrl: "14.jpg",
        },
        dateCreated: new Date(),
        dateUpdated: new Date(),
      })
      
      var m15 = Movie({
        id: "a-million-ways-to-die-in-the-west",
        title: "A Million Ways to Die in the West",
        description: "As a cowardly farmer begins to fall for the mysterious new woman in town, he must put his new-found courage to the test when her husband, a notorious gun-slinger, announces his arrival.",
        content: {
          videoUrl: "http://d2bqeap5aduv6p.cloudfront.net/project_coderush_640x360_521kbs_56min.mp4",
          imageUrl: "15.jpg",
        },
        dateCreated: new Date(),
        dateUpdated: new Date(),
      })
      
      var u1 = User({
        username: "johndoe",
        firstName: "John",
        lastName: "Doe",
        gender: 0,
        watchedMovies: [],
        dateCreated: new Date(),
        dateUpdated: new Date(),
      });
  
  //if empty - save    
  db.collection('movies').count({}, function (err, count) {
    if (count === 0) {
      save([m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13, m14, m15]);
    }
  });
  
  //if empty - save 
  db.collection('users').count({}, function (err, count) {
    if (count === 0) {
      save([u1])
    };
  });

}


