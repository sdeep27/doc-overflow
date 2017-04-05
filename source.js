let tags = [];
$(document).ready( () => {
    let tempSet;
    let tags = [];
    let headline = [];
    let answerLinks = [];
    let answerLinksText = [];
    let sideLinks = [];

    const stopWords = ["a", "able", "about", "across", "after", "all", "almost", "also", "am", "among", "an", "and", "any", "are", "as", "at", "be", "because", "been", "but", "by", "can", "cannot", "could", "dear", "did", "do", "does", "either", "else", "ever", "every", "for", "from", "get", "got", "had", "has", "have", "he", "her", "hers", "him", "his", "how", "however", "i", "if", "in", "into", "is", "it", "its", "just", "least", "let", "like", "likely", "may", "me", "might", "most", "must", "my", "neither", "no", "nor", "not", "of", "off", "often", "on", "only", "or", "other", "our", "own", "rather", "said", "say", "says", "she", "should", "since", "so", "some", "than", "that", "the", "their", "them", "then", "there", "these", "they", "this", "tis", "to", "too", "twas", "us", "wants", "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why", "will", "with", "would", "yet", "you", "your", "ain't", "aren't", "can't", "could've", "couldn't", "didn't", "doesn't", "don't", "hasn't", "he'd", "he'll", "he's", "how'd", "how'll", "how's", "i'd", "i'll", "i'm", "i've", "isn't", "it's", "might've", "mightn't", "must've", "mustn't", "shan't", "she'd", "she'll", "she's", "should've", "shouldn't", "that'll", "that's", "there's", "they'd", "they'll", "they're", "they've", "wasn't", "we'd", "we'll", "we're"," weren't", "what'd", "what's", "when'd", "when'll", "when's", "where'd", "where'll", "where's", "who'd", "who'll", "who's", "why'd", "why'll", "why's", "won't", "would've", "wouldn't", "you'd", "you'll", "you're", "you've", "way", "out", "code", "work", "working", "try", "trying", "tried"];

    function parseTags () {
        let arr = [];
        $('body').find('.post-tag').each(function(el) {
            let item = $(this).text();
            item = item.replace(/\./g, '');
            item = item.replace(/\+/g, 'p');
            item = item.replace(/\#/g, '-sharp');
            arr.push(item);
        });
        tempSet = new Set(arr);
        return Array.from(tempSet);
    }
    function parseHeadline () {
        let arr = [];
        let stopHash = {};
        let str = $('body').find('#question-header').find('a').text();
        str = str.replace(/\W+/g, ' ');
        let strArr = str.split(' ');
        let tempSet = new Set(strArr);
        strArr = Array.from(tempSet);

        for (let i = 0; i < stopWords.length; i += 1) {
            stopHash[ stopWords[i].trim() ] = true;
        }
        
        for (let i = 0; i < strArr.length; i += 1) {
            let word = strArr[i].trim().toLowerCase();
            if (!stopHash[word] && word.length > 0) {
                arr.push(word);
            }
        }

        return arr;
    }
    function parseAnswerLinks () {
        let arr = [];
        $('body').find('.accepted-answer').find('.post-text').find('a').each(function(el) {
            let item = $(this).attr('href');
            arr.push(item);
            answerLinksText.push($(this).text());
        });
        tempSet = new Set(arr);
        return Array.from(tempSet);
    }
    // function parseSideLinks () {
    //     let arr = [];
    //     $('body').find('.sidebar-linked').find('a').each(function(el) {
    //         arr.push($(this).attr('href'));
    //     });
    //     tempSet = new Set(arr);
    //     return Array.from(tempSet);
    // }


    tags = parseTags();
    headline = parseHeadline();
    answerLinks = parseAnswerLinks();
    // sideLinks = parseSideLinks();

    const map = {
        'javascript': ['https://developer.mozilla.org/en-US/docs/Learn/JavaScript', 'mdn+js'],
        'java': ['https://docs.oracle.com/javase/8/', 'oracle java'],
        'php': ['http://php.net/manual/en/', 'php manual'],
        'android': ['https://developer.android.com/guide/index.html', 'android developer'],
        'nodejs': ['https://nodejs.org/api/', 'node documentation'],
        'ajax': ['https://developer.mozilla.org/en-US/docs/AJAX', 'mdn+ajax'],
        'css': ['https://developer.mozilla.org/en-US/docs/Web/CSS', 'mdn+css'],
        'jquery': ['http://api.jquery.com/', 'jquery'],
        'ios': ['https://developer.apple.com/ios/resources/', 'apple ios'],
        'html': ['https://developer.mozilla.org/en-US/docs/Web/HTML', 'mdn html'],
        'angularjs': ['https://docs.angularjs.org/api', 'angularjs docs'],
        'reactjs': ['https://facebook.github.io/react/', 'react github'],
        'mysql': ['https://dev.mysql.com/doc/', 'mysql'],
        'json': ['http://www.json.org/', 'json.org'],
        'python': ['https://www.python.org/', 'python documentation'],
        'ruby-on-rails': ['http://api.rubyonrails.org/', 'api rubyonrails'],
        'express': ['https://expressjs.com/en/api.html', 'expressjs'],
        'twitter-bootstrap': ['http://bootstrapdocs.com/v3.0.3/docs/css/#overview', 'twitter bootstrap'],
        'git': ['https://git-scm.com/documentation', 'git documentation'],
        'github': ['https://guides.github.com/', 'github guides'],
        'cpp': ['http://en.cppreference.com/', 'cpp reference'],
        'c-sharp': ['https://msdn.microsoft.com/en-us/library/618ayhy6.aspx', 'c-sharp reference'],
        'c': ['https://www.gnu.org/software/gnu-c-manual/gnu-c-manual.html', 'c reference'],
        'objective-c': ['https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/Introduction/Introduction.html', 'objective-c reference'],
        'swift': ['https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/', 'swift, apple'],
        'haskell': ['https://www.haskell.org/', 'haskell.org'],
        'fortran': ['https://www.fortran.com/F77_std/rjcnf0001.html', 'fortran F77'],
        'matlab': ['https://www.mathworks.com/help/matlab/?requestedDomain=www.mathworks.com', 'matlab reference'],
        'wolfram-mathematica': ['http://reference.wolfram.com/language/', 'wolfram mathematica'], 

    }
    //logic for main container
    $('body').append('<div id = "dm-container"></div>');
    $('#dm-container').append('<div class = "dm-header">Expand Source Documentation</div>');
    $('#dm-container').append('<hr class = "dm-tag" width=80%>');
    const subjects = [];
    const mainTags = [];
    //logic for main tag addition
    tags.forEach(tag => {
        if (map[tag]){
            mainTags.push(tag);
            $('#dm-container').append('<div class = "dm-tag" + id = ' + tag + '><h3><a>' + tag + ' source docs' + '</a></h3></div>')
            let idTagA = '#' + tag + ' a';
            $(idTagA).attr('href', map[tag][0]).attr('target','_blank');
            $('#dm-container').append('<hr class = "dm-tag" width=80%>');
        }
        else subjects.push(tag);
    })
    //logic for subject addition
    headline.forEach(item => {
        if (mainTags.indexOf(item) === -1 && subjects.indexOf(item) === -1) subjects.push(item);
    })
    for (let i = 0; i < mainTags.length; i++){
        let tagId = '#' + mainTags[i];
        subjects.forEach(subject => {
            let appendVal = '<div class = "dm-subject" id =' + subject + i  + '>' + '<a>' + subject + '<span class = "dm-group">' + ' (' + mainTags[i] + ')' + '</span>' + '</a>' + '</div>'
            $(tagId).append(appendVal)
            let idSubject = '#' + subject + i + ' a';
            let url = 'https://google.com/search?q=' + map[mainTags[i]][1] + '+' + subject
            $(idSubject).attr('href', url).attr('target','_blank')
            

    })
    }
    //logic for nice expand and collapse
    $(".dm-header").click(function () {
    $('.dm-tag').slideToggle(500, function () {
        $('.dm-header').text(function () {
            return $('.dm-tag').is(":visible") ? "Collapse Source Documentation" : "Expand Source Documentation";
        });
    });
    });
    //logic for answer links
    $('#dm-container').append('<div class = "dm-tag" id="dm-best-answer"><h3><a href="#">links from best answer</a></h3><div>'); 
    if(answerLinks[0]){
        answerLinks.forEach((link, index) => {
            $('#dm-container').append('<div class = "dm-tag" id = "answer-link' + (index + 1) + '"> <a>' + answerLinksText[index] + '</a><div>');            
            let idLink = '#' + 'answer-link' + (index + 1) + ' a';
            $(idLink).attr('href', link).attr('target','_blank');
        })
    }

    let xhr = new XMLHttpRequest();
    // let parseUrl = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference';
    let parseUrl = 'https://google.com/search?q=' + map['javascript'][1] + '+' + 'object';
    xhr.open("GET", parseUrl, true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            let googleHtml = xhr.responseText;
            let link = $(googleHtml).find('.g').first().find('a').attr('href');
            console.log(link);
            $('#dm-container').append('<div class = "dm-tag" id = "testObj"><a>TestObject</a></div>');
            $('#testObj > a').attr('href', link).attr('target', '_blank');
        }
    };
    xhr.send();

    
    // console.log('tags: ', tags);
    // console.log('headline: ', headline);
    // console.log('answer links: ', answerLinks);
    // console.log('side links: ', sideLinks);
});