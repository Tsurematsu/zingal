import { create } from "zustand";

export default function zingal(objeto) {
    let setFunction = (data) => {};
    Object.entries(objeto).forEach(([key, value]) => {
        objeto[`set${capitalizar(key)}`] = (value) => setFunction({[key]: value});
    });

    const useStore = create((set) => {
        setFunction = set;
        return objeto;
    });

    return new Proxy(new function(){
        this.subscribe = () => {
            this.store = useStore();
            Object.setPrototypeOf(this, this.store);
        }
    }, {
        set: function(target, prop, value, receiver) {
            const property = `set${capitalizar(prop)}`;
            if (target[property] !== undefined) {
                target[property](value);
            }
            return Reflect.set(target, prop, value, receiver);
        },
        get: function(target, prop, receiver) {
            const Reflection1 = Reflect.get(target, prop, receiver);
            
            if (Array.isArray(Reflection1) || (typeof Reflection1 === 'object' && Reflection1 !== null)) {
                return new Proxy(Reflection1, {
                    get: function(target1, prop1, receiver1) {
                        const ResultadoReflect = Reflect.get(target1, prop1, receiver1);
                        if (prop1 === "push" && Array.isArray(target1)) {
                            return function(value) {
                                const newArray = [...target1, value];
                                target[`set${capitalizar(prop)}`](newArray);
                                return newArray.length;
                            };
                        }
                        if (typeof ResultadoReflect === 'object' && ResultadoReflect !== null) {
                            return new Proxy(ResultadoReflect, {
                                set: function(obj, key, value) {
                                    const newObj = Array.isArray(target1) ? [...target1] : {...target1};
                                    newObj[prop1] = {...obj, [key]: value};
                                    target[`set${capitalizar(prop)}`](newObj);
                                    return true;
                                }
                            });
                        }
                        return ResultadoReflect;
                    },
                    set: function(target1, prop1, value) {
                        const newObj = Array.isArray(target1) ? [...target1] : {...target1};
                        newObj[prop1] = value;
                        target[`set${capitalizar(prop)}`](newObj);
                        return true;
                    }
                });
            }
            return Reflection1;
        }
    });
}

function capitalizar(str) {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}