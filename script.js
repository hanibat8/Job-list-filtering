const main = document.querySelector('.filter__tab');
const jobsDOM = document.querySelector('.jobs');
const filterTab = document.querySelector('.filter__tab');

class Job {

    constructor(companyLogo, companyName, neww, featured, title, postedTime, type, location, tags) {
        this.companyLogo = companyLogo;
        this.companyName = companyName;
        this.neww = neww ? true : false;
        this.featured = featured ? true : false;
        this.title = title;
        this.postedTime = postedTime;
        this.type = type;
        this.location = location;
        this.tags = tags;
    }

}

class App {
    #jobs = [];
    #filteredJobs=[]
    #selectedTags=[]

    constructor(){
        jobsDOM.addEventListener('click',this.#filterJobs.bind(this));
        filterTab.addEventListener('click',this.#removeTags.bind(this));
    }

    newJob(imgPath, companyName, neww, featured, title, time,
        type, location, tags) {
        let job = new Job(imgPath, companyName, neww, featured, title, time,
            type, location, tags);
        this.#renderJob(job,true);
    }

    #renderJob(job,newJob) {

        const html = `
        <div class="job">
            <img class="img job__company-logo" src=${job.companyLogo}></img>
            <div class='job__details'>
            <div class="job__company-name-details">
            <span  class="job__company-name">${job.companyName}</h3>
            <span class="job__new ${job.neww ? '' : 'job__new__featured__hidden'}">${job.neww ? 'New!' : ''}</span>
            <span class="job__featured ${job.featured ? '' : 'job__new__featured__hidden'}">${job.featured ? 'Featured' : ''}</span>
            </div>
            <h2 class="job__title">${job.title}</h2>
            <span class="job__time-details job__posted-time">${job.postedTime}</span>
            <span class="job__time-details job__type">${job.type}</span>
            <span class="job__time-details job__location">${job.location}</span>
            </div>
            <hr class="horizontal"/>
            <div class="job__tags">
            ${job.tags.map(this.#generateTagMarkup).join('')}
            </div>
        </div>`;

        jobsDOM.insertAdjacentHTML('beforeend', html);
        if(newJob)this.#jobs.push(job);
    }

    #generateTagMarkup(tag) {
        return `<span class="job__tag" data-tag=${tag}>${tag}</span>`;
    }

    #displayFilteredTags(tagName){
        if(this.#selectedTags.includes(tagName)){
            const html=`
            <div class="job-filtered__tag">
                <span class="job__tag" data-tag=${tagName}>${tagName}</span>
                <span class='cross'>
                    <img class="cross__icon" src="./images/x.svg"></img>
                </span>
            </div>`;
            filterTab.insertAdjacentHTML('beforeend',html);
        }
    }

    #filterJobs(e){
     
        const clicked=this.#getClicked('.job__tag',e);

        if(!clicked) return;

        filterTab.classList.remove('hide');

        let tagName=clicked.getAttribute('data-tag');

        this.#selectedTags.push(tagName);
       
        this.#displayFilteredTags(tagName);

        this.#checkIfFilteredJobsEmpty();

        this.#filteredJobs=this.#filteredJobs.filter(this.#filterJobByTagName.bind([tagName]));

        this.#renderFilterJobs();
    }


    #removeTags(e){
        const clicked=this.#getClicked('.cross',e);

        if(!clicked) return;

        let deselectedTag=clicked.previousElementSibling.getAttribute('data-tag');

        this.#selectedTags=this.#selectedTags.filter(function(tag){
            if(tag!=deselectedTag){
                return tag;
            }
        });

        this.#filteredJobs=this.#jobs.filter(this.#filterJobByTagName.bind(this.#selectedTags));

        filterTab.innerHTML='';

        this.#checkIfSelectedTagsEmpty();

        this.#checkIfFilteredJobsEmpty();

        this.#renderFilterJobs();
    }

    #getClicked(str,e){
        const clicked=e.target.closest(str);
        
        if(!clicked) return;

        jobsDOM.innerHTML='';

        return clicked;
    }

    #filterJobByTagName(job){
        for(let i=0;i<this.length;i++){
            if(!job.tags.includes(this[i])){
                return;
            }
            if(this.length-1===i){
                return job;
            }
        }
    }

    #checkIfSelectedTagsEmpty(){
        if(this.#selectedTags.length===0){ 
            filterTab.classList.add('hide'); 
            this.#filteredJobs=this.#jobs;
        }
        else{   
            this.#selectedTags.forEach(this.#displayFilteredTags.bind(this));
        }
    }

    #checkIfFilteredJobsEmpty(){
        this.#filteredJobs=this.#filteredJobs.length===0 ? this.#jobs: this.#filteredJobs;
    }

    #renderFilterJobs(){
        this.#filteredJobs.forEach(function(job){
            this.#renderJob(job,false);
        }.bind(this));
    }

}

const app = new App();

app.newJob('./images/photosnap.svg','PhotoSnap',true,true,'Senior Frontend Developer','1d ago','Full time','USA only',['Frontend','Senior','HTML','CSS','JavaScript']);

app.newJob('./images/manage.svg','Manage',true,true,'Fullstack Developer','1d ago','Part time','Remote',['Fullstack','Midweight','Python','React',]);

app.newJob('./images/account.svg','Account',true,false,'Senior Frontend Developer','2d ago','Part time','USA only',['Frontend','Junior','React','Sass','JavaScript']);

app.newJob('./images/myhome.svg','MyHome',false,false,'Jr Frontend Developer','5d ago','Contract','USA only',['Frontend','Junior','React','Sass','JavaScript']);

app.newJob('./images/loop-studios.svg','Loop Studios',false,false,'Software Engineer','1w ago','Full time','Worldwide',['Fullstack','Midweight','Sass','Ruby','JavaScript']);

app.newJob('./images/faceit.svg','FaceIt',false,false,'Jr Backend Developer','2w ago','Full time','UK only',['Backend','Junior','Ruby','RoR']);

app.newJob('./images/shortly.svg','Shortly',false,false,'Junior Developer','2w ago','Full time','Worldwide',['Frontend','Junior','HTML','Sass','JavaScript']);

app.newJob('./images/eyecam-co.svg','Eyecam Co.',false,false,'Full Stack Engineer','3w ago','Full time','Worldwide',['Fullstack','Midweight','Django','Python','JavaScript']);

app.newJob('./images/the-air-filter-company.svg','The Air Filter Company',false,false,'Frontend Developer','1mo ago','Part time','Worldwide',['Frontend','Junior','React','JavaScript']);
