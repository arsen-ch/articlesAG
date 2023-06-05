export default {

    bind: ( el, binding, vnode ) => {

        const documentHandler = ( e ) => {
            if ( el.contains( e.target ) ) {
                return false;
            } else if ( binding.expression ) {
                binding.value( e );
            }
        };

        el.__vueClickOutside__ = documentHandler;
        document.addEventListener( 'click', documentHandler );
    },

    update: () => {

    },

    unbind: ( el, binding ) => {
        document.removeEventListener( 'click', el.__vueClickOutside__ );
        delete el.__vueClickOutside__;
    }
};
