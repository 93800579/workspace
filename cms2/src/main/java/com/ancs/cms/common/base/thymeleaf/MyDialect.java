package com.ancs.cms.common.base.thymeleaf;

/*
 * =============================================================================
 * 
 *   Copyright (c) 2011-2016, The THYMELEAF team (http://www.thymeleaf.org)
 * 
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 * 
 *       http://www.apache.org/licenses/LICENSE-2.0
 * 
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * 
 * =============================================================================
 */

import java.util.LinkedHashSet;
import java.util.Map;
import java.util.Set;

import org.thymeleaf.expression.IExpressionObjectFactory;
import org.thymeleaf.processor.IProcessor;
import org.thymeleaf.spring4.expression.SPELVariableExpressionEvaluator;
import org.thymeleaf.spring4.expression.SpringStandardConversionService;
import org.thymeleaf.spring4.expression.SpringStandardExpressionObjectFactory;
import org.thymeleaf.spring4.expression.SpringStandardExpressions;
import org.thymeleaf.standard.StandardDialect;
import org.thymeleaf.standard.expression.IStandardConversionService;
import org.thymeleaf.standard.expression.IStandardVariableExpressionEvaluator;
import org.thymeleaf.standard.processor.StandardActionTagProcessor;
import org.thymeleaf.standard.processor.StandardHrefTagProcessor;
import org.thymeleaf.standard.processor.StandardMethodTagProcessor;
import org.thymeleaf.standard.processor.StandardObjectTagProcessor;
import org.thymeleaf.standard.processor.StandardSrcTagProcessor;
import org.thymeleaf.standard.processor.StandardValueTagProcessor;
import org.thymeleaf.templatemode.TemplateMode;

/**
 * <p>
 *   SpringStandard Dialect. This is the class containing the implementation of Thymeleaf Standard Dialect, including all
 *   <tt>th:*</tt> processors, expression objects, etc. for Spring-enabled environments.
 * </p>
 * <p>
 *   Note this dialect uses <strong>SpringEL</strong> as an expression language and adds some Spring-specific
 *   features on top of {@link StandardDialect}, like <tt>th:field</tt> or Spring-related expression objects.
 * </p>
 * <p>
 *   The usual and recommended way of using this dialect is by instancing {@link org.thymeleaf.spring4.SpringTemplateEngine}
 *   instead of {@link org.thymeleaf.TemplateEngine}. The former will automatically add this dialect and perform
 *   some specific configuration like e.g. Spring-integrated message resolution.
 * </p>
 * <p>
 *   Note a class with this name existed since 1.0, but it was completely reimplemented
 *   in Thymeleaf 3.0
 * </p>
 *
 * @author Daniel Fern&aacute;ndez
 * 
 * @since 3.0.0
 *
 */
public class MyDialect extends StandardDialect {

    public static final String NAME = "MyDialect";
    public static final String PREFIX = "my";
    public static final int PROCESSOR_PRECEDENCE = 1000;


    private boolean enableSpringELCompiler = false;


    private final IExpressionObjectFactory SPRING_STANDARD_EXPRESSION_OBJECTS_FACTORY = new SpringStandardExpressionObjectFactory();
    private final IStandardConversionService SPRING_STANDARD_CONVERSION_SERVICE = new SpringStandardConversionService();
    
    
    
    
    public MyDialect() {
        super(NAME, PREFIX, PROCESSOR_PRECEDENCE);
    }




    /**
     * <p>
     *   Returns whether the SpringEL compiler should be enabled in SpringEL expressions or not.
     * </p>
     * <p>
     *   Expression compilation can significantly improve the performance of Spring EL expressions, but
     *   might not be adequate for every environment. Read
     *   <a href="http://docs.spring.io/spring/docs/current/spring-framework-reference/html/expressions.html#expressions-spel-compilation">the
     *   official Spring documentation</a> for more detail.
     * </p>
     * <p>
     *   Also note that although Spring includes a SpEL compiler since Spring 4.1, most expressions
     *   in Thymeleaf templates will only be able to properly benefit from this compilation step when at least
     *   Spring Framework version 4.2.4 is used.
     * </p>
     * <p>
     *   This flag is set to <tt>false</tt> by default.
     * </p>
     *
     * @return <tt>true</tt> if SpEL expressions should be compiled if possible, <tt>false</tt> if not.
     */
    public boolean getEnableSpringELCompiler() {
        return enableSpringELCompiler;
    }


    /**
     * <p>
     *   Sets whether the SpringEL compiler should be enabled in SpringEL expressions or not.
     * </p>
     * <p>
     *   Expression compilation can significantly improve the performance of Spring EL expressions, but
     *   might not be adequate for every environment. Read
     *   <a href="http://docs.spring.io/spring/docs/current/spring-framework-reference/html/expressions.html#expressions-spel-compilation">the
     *   official Spring documentation</a> for more detail.
     * </p>
     * <p>
     *   Also note that although Spring includes a SpEL compiler since Spring 4.1, most expressions
     *   in Thymeleaf templates will only be able to properly benefit from this compilation step when at least
     *   Spring Framework version 4.2.4 is used.
     * </p>
     * <p>
     *   This flag is set to <tt>false</tt> by default.
     * </p>
     *
     * @param enableSpringELCompiler <tt>true</tt> if SpEL expressions should be compiled if possible, <tt>false</tt> if not.
     */
    public void setEnableSpringELCompiler(final boolean enableSpringELCompiler) {
        this.enableSpringELCompiler = enableSpringELCompiler;
    }




    @Override
    public IStandardVariableExpressionEvaluator getVariableExpressionEvaluator() {
        return SPELVariableExpressionEvaluator.INSTANCE;
    }



    @Override
    public IStandardConversionService getConversionService() {
        return SPRING_STANDARD_CONVERSION_SERVICE;
    }


    @Override
    public IExpressionObjectFactory getExpressionObjectFactory() {
        return SPRING_STANDARD_EXPRESSION_OBJECTS_FACTORY;
    }




    @Override
    public Set<IProcessor> getProcessors(final String dialectPrefix) {
        return createSpringStandardProcessorsSet(dialectPrefix);
    }



    @Override
    public Map<String, Object> getExecutionAttributes() {

        final Map<String,Object> executionAttributes = super.getExecutionAttributes();
        executionAttributes.put(
                SpringStandardExpressions.ENABLE_SPRING_EL_COMPILER_ATTRIBUTE_NAME, Boolean.valueOf(getEnableSpringELCompiler()));

        return executionAttributes;

    }




    /**
     * <p>
     *   Create a the set of SpringStandard processors, all of them freshly instanced.
     * </p>
     *
     * @param dialectPrefix the prefix established for the Standard Dialect, needed for initialization
     * @return the set of SpringStandard processors.
     */
    public static Set<IProcessor> createSpringStandardProcessorsSet(final String dialectPrefix) {
        /*
         * It is important that we create new instances here because, if there are
         * several dialects in the TemplateEngine that extend StandardDialect, they should
         * not be returning the exact same instances for their processors in order
         * to allow specific instances to be directly linked with their owner dialect.
         */

        final Set<IProcessor> standardProcessors = StandardDialect.createStandardProcessorsSet(dialectPrefix);

        final Set<IProcessor> processors = new LinkedHashSet<IProcessor>(40);


        /*
         * REMOVE STANDARD PROCESSORS THAT WE WILL REPLACE
         */
        for (final IProcessor standardProcessor : standardProcessors) {
            // There are several processors we need to remove from the Standard Dialect set
            if (!(standardProcessor instanceof StandardObjectTagProcessor) &&
                    !(standardProcessor instanceof StandardActionTagProcessor) &&
                    !(standardProcessor instanceof StandardHrefTagProcessor) &&
                    !(standardProcessor instanceof StandardMethodTagProcessor) &&
                    !(standardProcessor instanceof StandardSrcTagProcessor) &&
                    !(standardProcessor instanceof StandardValueTagProcessor)) {

                processors.add(standardProcessor);

            } else if (standardProcessor.getTemplateMode() != TemplateMode.HTML) {
                // We only want to remove from the StandardDialect the HTML versions of the attribute processors
                processors.add(standardProcessor);
            }
        }


        /*
         * ATTRIBUTE TAG PROCESSORS
         */
        processors.add(new MyTextTagProcessor(TemplateMode.HTML, dialectPrefix));

        /*
         * DOCTYPE PROCESSORS
         */

        return processors;

    }


}
