import React from 'react';
import FeatureBlock from './Featureblock';
import { useLocation } from 'react-router-dom';

const ItemPage = () => {
    const location = useLocation();
    
        return (
            <div className='block'>

                <FeatureBlock.Item data={location.state.item}/>
                <p>Lorem ipsum dolor sit amet consectetur,
                     adipisicing elit. Aliquam suscipit, magni, 
                     assumenda nisi unde vel nam voluptatem perferendis
                      itaque eaque ab. Impedit minima aliquam consectetur eligendi
                       et dolorum autem voluptatum explicabo voluptate cum dolor maiores
                        unde molestiae, assumenda nulla? Earum corrupti eligendi optio, 
                        repudiandae nesciunt fuga, delectus nihil modi a odio dolores
                         blanditiis ipsam. Iste maiores perspiciatis deleniti dignissios. Voluptas natus odio harum, commodi,
                          possimus voluptatum dolor est ipsam consequatur odit eligendi                     
                 praesentium repellat dignissimos blanditiis. Aspernatur repellendus eos 
                   aliquam eveniet dolores deserunt ex molestiae,
                        illum nisi debitis facilis accusamus dolorem ullam 
                        pariatur voluptate tempora cum sint commodi nobis animi
                         tempore ab, saepe eum. Reprehenderit natus esse repudiandae
                          voluptas. Nobis ut consectetur fugit! Cumque
                           est sit voluptatum dolorem eligendi explicabo molestiae corporis, laboriosam assumenda tempora
                            repellat atque, nemo unde sunt voluptatibus facilis quia! Dolores sit suscipit aspernatur atque
                             delectus accusamus magni. Fuga dolorum, accusamus mollitia quidem in neque\
                              inventore nam! Aliquid autem laboriosam natus maiores
                              , impedit dicta voluptatibus velit alias
                             magni neque officia ex laudantium inventore. Repellat, similique culpa vero pariatur excepturi praesentium
                             maiores. A, ipsa! Alias voluptatibus aliquid asperiores itaque quod numquam voluptatum
                          soluta autem consequatur distinctio nemo optio ratione, magni
                            , laudantium omnis placeat sapiente? Cumque
                               possimus dicta magnam.
                               </p>                


            </div>
        );
    
}

export default ItemPage;