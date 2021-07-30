var allBlogsData = [];


for (var i = 1; i <= 20; i++) {

    var title = "";

    if (i === 1) {
        title += `${i} - Beginners know something experts don't`
    } else {
        title += `${i} - Lorem Ipsum is simply dummy text of the printing and typesetting industry.`
    }

    allBlogsData.push(i % 2 === 0 ? {

        date: "July 4, 2021",
        author: "Prashant Goyal",
        title: title,
        // content: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.",
        contentArray: [
            "You turn in your first assignment (logging half the hours you actually spent) and make yourself sick waiting for feedback. One minute you’re sure your banner design should win an award. The next you think you might get fired. Your director sends revisions, and lots of them. You basically need to redesign from scratch. You’re crushed, but at least you have a job! You make the changes and realize your work is much better.",
            "And so it goes, day after day and task after task. You admire your mentors and soak up every bit of advice they can give you. Soon, you’re no longer the beginner. You’ve been working and learning for years. Everything new has become routine.",
            "Which is where many of us find ourselves now.",
            "Maybe you’ve been designing for a long time and feel burned out. Maybe you think you’ve learned all there is to know. For me, a few years into product design, those beginner days are not far from my memory. And I don’t want them to be.",
            "We all strive for the confidence and ease that comes with experience, but a beginner’s mindset could benefit all of us – no matter where we are in our career.",
            {
                type: "heading",
                content: "Beginners are actually, purely trying to do their best",
            },
            "Think back to a time when you were just discovering your love for a new hobby, sport or career. When you were doing it out of pure interest and passion. What was your mindset?",
            "When I first became interested in design, I would stay up late every night watching YouTube tutorials on Adobe Illustrator, reading blog posts about how to start a design career, and working on side projects so I’d have something to add to my non-existent portfolio.",
            "Even when I got my first design internship, I kept up my habits. I was so hungry to prove that I made the right choice in switching careers. I feared slowing down would kill my momentum, and I’d fail. I worked hard and put in the hours even though no one told me to.",
            "When your interest is piqued and you’re starting something new, you have the drive to establish a good first impression and prove you belong there.",
            "Imagine that pure passion and drive combined with the skills and experience you have later in your career. What would you create? How could we find that passion again?",
            {
                type: "heading",
                content: "Beginners think differently because they don’t have your assumptions"
            },
            "A sentiment I hear often in the agency environment when working with a new client is how appreciative they are to “have a pair of fresh eyes” looking at their product. What they mean is that it’s valuable to have someone unfamiliar with the product – someone that doesn’t share their assumptions – look at it from a different perspective.",
            "Beginners don’t have anything to lose by rethinking the problem at hand. We can question assumptions others take for granted and trigger a re-thinking cycle.",
            "What outdated systems, practices and beliefs could we improve if we believed we had nothing to lose? What assumptions are we making just because we've become comfortable at our jobs?",
            {
                type: "heading",
                content: "Beginners have a humble attitude and are open to learning"
            },
            "Beginners know they don’t know it all. When you have doubts about your knowledge and skills, you’re more likely to ask for help, which allows you to learn from experienced professionals and grow.",
            "The key here is to accept the fact that you don’t have all the answers, no matter how experienced you are. Staying humble takes you off your pedestal and enables you to learn from others.",
            "Even if you're an expert in your field, you can always afford to take a step back and approach your next project or task through the eyes of a beginner. We all have doubts about our abilities and fear that we’re not doing enough in our jobs, but the more you acknowledge these feelings, the better you’ll become at using it as your fuel."
        ]
    } : {

        date: "July 4, 2021",
        author: "Prashant Goyal",
        title: title,
        // content: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.",
        contentArray: [
            {
                type: "image",
                content: "https://miro.medium.com/max/3000/1*5hmMGBO63M5jFYYjqlqwaQ.jpeg"
            },
            "You turn in your first assignment (logging half the hours you actually spent) and make yourself sick waiting for feedback. One minute you’re sure your banner design should win an award. The next you think you might get fired. Your director sends revisions, and lots of them. You basically need to redesign from scratch. You’re crushed, but at least you have a job! You make the changes and realize your work is much better.",
            "And so it goes, day after day and task after task. You admire your mentors and soak up every bit of advice they can give you. Soon, you’re no longer the beginner. You’ve been working and learning for years. Everything new has become routine.",
            "Which is where many of us find ourselves now.",
            "Maybe you’ve been designing for a long time and feel burned out. Maybe you think you’ve learned all there is to know. For me, a few years into product design, those beginner days are not far from my memory. And I don’t want them to be.",
            "We all strive for the confidence and ease that comes with experience, but a beginner’s mindset could benefit all of us – no matter where we are in our career.",
            {
                type: "heading",
                content: "Beginners are actually, purely trying to do their best",
            },
            "Think back to a time when you were just discovering your love for a new hobby, sport or career. When you were doing it out of pure interest and passion. What was your mindset?",
            "When I first became interested in design, I would stay up late every night watching YouTube tutorials on Adobe Illustrator, reading blog posts about how to start a design career, and working on side projects so I’d have something to add to my non-existent portfolio.",
            "Even when I got my first design internship, I kept up my habits. I was so hungry to prove that I made the right choice in switching careers. I feared slowing down would kill my momentum, and I’d fail. I worked hard and put in the hours even though no one told me to.",
            "When your interest is piqued and you’re starting something new, you have the drive to establish a good first impression and prove you belong there.",
            "Imagine that pure passion and drive combined with the skills and experience you have later in your career. What would you create? How could we find that passion again?",
            {
                type: "heading",
                content: "Beginners think differently because they don’t have your assumptions"
            },
            "A sentiment I hear often in the agency environment when working with a new client is how appreciative they are to “have a pair of fresh eyes” looking at their product. What they mean is that it’s valuable to have someone unfamiliar with the product – someone that doesn’t share their assumptions – look at it from a different perspective.",
            "Beginners don’t have anything to lose by rethinking the problem at hand. We can question assumptions others take for granted and trigger a re-thinking cycle.",
            "What outdated systems, practices and beliefs could we improve if we believed we had nothing to lose? What assumptions are we making just because we've become comfortable at our jobs?",
            {
                type: "heading",
                content: "Beginners have a humble attitude and are open to learning"
            },
            "Beginners know they don’t know it all. When you have doubts about your knowledge and skills, you’re more likely to ask for help, which allows you to learn from experienced professionals and grow.",
            "The key here is to accept the fact that you don’t have all the answers, no matter how experienced you are. Staying humble takes you off your pedestal and enables you to learn from others.",
            "Even if you're an expert in your field, you can always afford to take a step back and approach your next project or task through the eyes of a beginner. We all have doubts about our abilities and fear that we’re not doing enough in our jobs, but the more you acknowledge these feelings, the better you’ll become at using it as your fuel."
        ]
    }
    )
};

module.exports = {
    allBlogsData: allBlogsData
}
// export {allBlogsData};
// export default allBlogsData;