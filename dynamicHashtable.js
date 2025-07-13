export class Dynamichash{
    constructor(){
        this.size = 211; 
        this.table = Array(this.size).fill(null);
        this.num_element = 0;
        this.deleted = 'deleted_slot'; 
    };

    _hash_Function(key){
        let a = 0.6188033; 
        return parseInt(this.size * ((Number(key) * a) % 1));
    };

    _next_probe_index(initial_hash, probe_count){
        return (initial_hash + probe_count * probe_count) % this.size;
    };

    _reHash(new_size){
        const old_table = this.table;
        this.table = Array(new_size).fill(null);
        this.size = new_size;
        this.num_element = 0; 
        this._rehash_item(old_table);
    };

    _resize_if_needed(){
        const load_factor = this.num_element / this.size;
        if (load_factor >= 0.75){ 
            this._reHash(this.size * 2); 
        } else if (load_factor < 0.25 && this.size > 211){ 
            this._reHash(Math.floor(this.size / 2)); 
        };
    };

    _rehash_item(old_table){
        old_table.forEach(item => {
            if (item !== null && item !== this.deleted){
                this._insert_without_resize(item.key, item); 
            }
        });
    };

    _insert_without_resize(key , data){
        let initial_hash = this._hash_Function(key);
        let i = 0; 

        while(i < this.size){ 
            let current_index = this._next_probe_index(initial_hash, i);
            const current_slot_value = this.table[current_index];

            if (current_slot_value === null || current_slot_value === this.deleted){
                this.table[current_index] = data;
                this.num_element++;
                return true;
            } else if (current_slot_value.key == key){
                return false;
            }
            
            i++; 
        }
        return false; 
    };

    _is_slot_taken(index){
        return this.table[index] !== null && this.table[index] !== this.deleted;
    };

    insert(key , data){
        this._resize_if_needed();
        return this._insert_without_resize(key , data);
    };

    delete(key){ 
        let initial_hash = this._hash_Function(key);
        let i = 0;

        while(i < this.size){ 
            let current_index = this._next_probe_index(initial_hash, i);
            const current_slot_value = this.table[current_index];

            if (current_slot_value === null){
                return false;
            } else if (current_slot_value === this.deleted){
            } else if (current_slot_value.key == key){
                this._delete_item(current_index);
                return true;
            }
            i++;
        }
        return false;
    };

    search(key){
        let initial_hash = this._hash_Function(key);
        let i = 0;

        while(i < this.size){
            let current_index = this._next_probe_index(initial_hash, i);
            const current_slot_value = this.table[current_index];
            
            if (current_slot_value === null){
                return null;
            } else if (current_slot_value === this.deleted){
            } else if (current_slot_value ? current_slot_value.key == key : false){
                return current_slot_value;
            }
            
            i++;
        }
        return null;
    }   

    _delete_item(index){
        this.table[index] = this.deleted;
        this.num_element -- ;
        this._resize_if_needed();
    };

    display(){
        let result = ""
        for(let i = 0 ; i<this.size ; i++){
            if(this.table[i] !== null){
                if (this.table[i] !== this.deleted) {
                    result += "\n\n" + this.table[i].toString() + "->";
                } else {
                    result += "\n\n" + "DELETED->";
                }
            }
        };
        return result;
    }
};