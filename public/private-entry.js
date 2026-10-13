const link=document.createElement('a');link.href='/harbour';link.className='small';link.textContent='Harbour';document.querySelector('.header-actions')?.append(link);
const tabs=document.querySelector('.dashboard-tabs');if(tabs){const entry=document.createElement('a');entry.href='/harbour';entry.className='harbour-tab';entry.textContent='Harbour · Crew & discussions';tabs.append(entry);}
