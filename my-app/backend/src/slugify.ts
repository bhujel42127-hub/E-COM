export function slugify(text) {
  return text
    .toString()                  
    .toLowerCase()               
    .trim()                      
    .replace(/[\s\-_]+/g, '-')   
    .replace(/[^\w\-]+/g, '')    
    .replace(/\-\-+/g, '-');     
}
