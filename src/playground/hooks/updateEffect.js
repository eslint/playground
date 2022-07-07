import { useEffect, useRef } from "react";

export default function useUpdateEffect(effect, dependencies = []) {
  const render = useRef('first');
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
        //To handle react scrict mode.
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            if(render.current === 'second')
                isInitialMount.current = false;
            render.current = 'second';
        } else {
        isInitialMount.current = false;
        }
    } else {
      return effect();
    }
  }, dependencies);
}